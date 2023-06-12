import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col} from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from "react";

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])


    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await axios.post("http://localhost:8080/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId})
    
            const updatedReviews = [...reviews, {body: rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt=""></img>
                </Col>
                <Col>
                    {   <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"></ReviewForm>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col><hr /></Col>
            </Row>
        </Container>
    )
}

export default Reviews;