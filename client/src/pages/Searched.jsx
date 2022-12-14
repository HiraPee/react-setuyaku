import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import postApi from "../api/postApi";
import { Box, Container, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import Favorite from "./Favorite";

const Searched = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await postApi.getOne(postId);
        setPost(res);
        const timeline = res.timeline.split("T");
        setDay(timeline[0]);
        //setTime(timeline[1].split(".")[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId]);

  return (
    <>
      <Container component="main" maxWidth="40%">
        <Box border={1} borderRadius="borderRadius">
          <Box id="title" sx={{ ml: 4 }}>
            <Box sx={{ display: "flex" }}>
              <IconButton component={Link} to={"/search"} sx={{ mr: 10 }}>
                <ArrowBackIcon />
              </IconButton>

              <Box sx={{ display: "flex", ml: 1, justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "40px" }}>{post.title}</Typography>
              </Box>
            </Box>

            <Typography sx={{ mt: "20px" }}>投稿日: {day}</Typography>
            <Typography>by: {post.postUserName}</Typography>

            <Box sx={{ paddingTop: "10px" }}></Box>
            <Box border={1} maxWidth="90%">
              <Typography sx={{ ml: 2 }}>説明:{post.description}</Typography>
            </Box>

            <Box sx={{ paddingTop: "10px" }}></Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Searched;
