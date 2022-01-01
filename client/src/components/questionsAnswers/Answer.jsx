import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Moment from 'react-moment';
import QuestionsContext from './QuestionsContext.js';
import { TOKEN } from '../../config.js';

export default function Answer({ questionObj }) {
  // CONTEXT
  const { questionsData, setQuestionsData } = useContext(QuestionsContext);

  // STATE
  const [answerHelpfulTracker, setAnswerHelpfulTracker] = useState({});

  const [answerReportedTracker, setAnswerReportedTracker] = useState({});
  const [answers, setAnswers] = useState([]);

  const [showRemainderAnswers, setShowRemainderAnswers] = useState(false);

  // METHODS
  useEffect(() => {
    const getAnswers = async () => {
      try {
        const res = await axios.get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionObj.question_id}/answers`,
          {
            // params: {
            //   page: 1,
            //   count: 1,
            // },
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        setAnswers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAnswers();
  }, []);

  const increaseAnswerHelpfulCount = async (e, answerObj) => {
    e.preventDefault();
    try {
      const body = {};
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerObj.answer_id}/helpful`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('ANS HELPFUL PUT RES: ', res);

      const keyId = answerObj.answer_id;
      const trackerCopy = Object.assign({}, answerHelpfulTracker);
      const questionsDataCopy = [...questionsData.results];
      let incrementedCount = answerObj.helpfulness + 1;
      for (let i = 0; i < questionsDataCopy.length; i++) {
        let question = questionsDataCopy[i];
        for (let key in question) {
          if (
            question[key] === questionObj.question_id &&
            !trackerCopy.hasOwnProperty([keyId])
          ) {
            answerObj.helpfulness = incrementedCount;
            trackerCopy[keyId] = 'Incremented';
          }
        }
      }
      setQuestionsData({
        product_id: questionsData.product_id,
        results: questionsDataCopy,
      });
      setAnswerHelpfulTracker(trackerCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerReported = async (e, answerObj) => {
    e.preventDefault();
    try {
      const body = {};
      const res = await axios.put(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerObj.answer_id}/report`,
        body,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      console.log('ANS REPORTED PUT RES: ', res);

      const keyId = answerObj.answer_id;
      const trackerCopy = Object.assign({}, answerReportedTracker);
      const questionsDataCopy = [...questionsData.results];
      for (let i = 0; i < questionsDataCopy.length; i++) {
        let question = questionsDataCopy[i];
        for (let key in question) {
          if (
            question[key] === questionObj.question_id &&
            !trackerCopy.hasOwnProperty([keyId])
          ) {
            trackerCopy[keyId] = 'Reported';
          }
        }
      }
      setQuestionsData({
        product_id: questionsData.product_id,
        results: questionsDataCopy,
      });
      setAnswerReportedTracker(trackerCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeeMoreAnswers = e => {
    e.preventDefault();
    if (showRemainderAnswers) {
      setShowRemainderAnswers(false);
    } else {
      setShowRemainderAnswers(true);
    }
  };

  // VARIABLES
  const sellerAnswers = answers?.results?.filter(
    answer => answer.answerer_name === 'Seller'
  );

  const orderedAnswers = answers?.results
    ?.sort((a, b) => b.helpfulness - a.helpfulness)
    ?.filter(answer => answer.answerer_name !== 'Seller');

  const finalAnswers = sellerAnswers?.concat(orderedAnswers);

  const initialFinalAnswers = finalAnswers?.slice(0, 2);

  const remainingFinalAnswers = finalAnswers?.slice(2);

  const initialMappedAnswers = initialFinalAnswers?.map(answer => (
    <AnswerPortion key={answer?.answer_id}>
      <AnswerHeader>
        <strong>A:</strong>
        <AnswerBodyContainer>
          <AnswerBody>{answer?.body}</AnswerBody>
          <AnswerDetails>
            <br />
            <span>
              by:{' '}
              {answer?.answerer_name === 'Seller' ? (
                <strong>{answer?.answerer_name}</strong>
              ) : (
                answer?.answerer_name
              )}
              , <Moment format='MMMM Do YYYY'>{answer?.date}</Moment> | Helpful?{' '}
              <a href=''>
                <YesSec onClick={e => increaseAnswerHelpfulCount(e, answer)}>
                  Yes
                </YesSec>
              </a>{' '}
              ({answer?.helpfulness}) |{' '}
              <a href='' onClick={e => handleAnswerReported(e, answer)}>
                <ReportSec>
                  {answerReportedTracker[answer?.answer_id]
                    ? 'Reported'
                    : 'Report'}
                </ReportSec>
              </a>
            </span>

            {answer?.photos.length > 0 && (
              <PhotoContainer>
                <Photos>
                  {answer?.photos?.map((photoSrc, idx) => (
                    <img
                      key={idx}
                      src={photoSrc.url}
                      width='200'
                      height='200'
                      loading='lazy'
                    />
                  ))}
                </Photos>
              </PhotoContainer>
            )}
          </AnswerDetails>
        </AnswerBodyContainer>
      </AnswerHeader>
    </AnswerPortion>
  ));

  const remainingMappedAnswers = remainingFinalAnswers?.map(answer => (
    <AnswerPortion key={answer?.answer_id}>
      <AnswerHeader>
        <strong>A:</strong>
        <AnswerBodyContainer>
          <AnswerBody>{answer?.body}</AnswerBody>{' '}
          <AnswerDetails>
            <br />
            <span>
              by:{' '}
              {answer?.answerer_name === 'Seller' ? (
                <strong>{answer?.answerer_name}</strong>
              ) : (
                answer?.answerer_name
              )}
              , <Moment format='MMMM Do YYYY'>{answer?.date}</Moment> | Helpful?{' '}
              <a href=''>
                <YesSec onClick={e => increaseAnswerHelpfulCount(e, answer)}>
                  Yes
                </YesSec>
              </a>{' '}
              ({answer?.helpfulness}) |{' '}
              <a href='' onClick={e => handleAnswerReported(e, answer)}>
                <ReportSec>
                  {answerReportedTracker[answer?.answer_id]
                    ? 'Reported'
                    : 'Report'}
                </ReportSec>
              </a>
            </span>

            {answer?.photos.length > 0 && (
              <PhotoContainer>
                <Photos>
                  {answer?.photos?.map((photoSrc, idx) => (
                    <img
                      key={idx}
                      src={photoSrc.url}
                      width='200'
                      height='200'
                      loading='lazy'
                    />
                  ))}
                </Photos>
              </PhotoContainer>
            )}
          </AnswerDetails>
        </AnswerBodyContainer>
      </AnswerHeader>
    </AnswerPortion>
  ));

  return (
    <Container>
      {initialMappedAnswers}
      {showRemainderAnswers && remainingMappedAnswers}
      <hr style={{ border: '1px solid #000', borderColor: 'black' }} />
      {console.log('ANSWERS: ', answers)}
      {remainingFinalAnswers?.length > 0 && (
        <span>
          <a href='' onClick={handleSeeMoreAnswers}>
            <CollapseBtn>
              {showRemainderAnswers ? 'Collapse answers' : 'See more answers'}
            </CollapseBtn>
          </a>
        </span>
      )}
    </Container>
  );
}

const Container = styled.div``;

const AnswerBodyContainer = styled.div`
  margin: 0px 0px 0px 10px;
`;

const AnswerPortion = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const AnswerHeader = styled.div`
  display: flex;
`;

const AnswerBody = styled.p`
  margin: 0px 0px 0px 0px;
`;

const AnswerDetails = styled.div`
  font-size: 15px;
`;

const YesSec = styled.span`
  color: green;
`;

const ReportSec = styled.span`
  color: red;
`;

const PhotoContainer = styled.div``;

const Photos = styled.div`
  margin-top: 8px;

  img {
    border-radius 10px;
    margin-right: 15px;
  }
`;

const CollapseBtn = styled.button`
	padding: 8px 12px;
	border-radius 6px;
	border: none;
	background: #000;
	color: #fff;
	cursor: pointer;
`;