import Link from "next/link";
import React from "react";
import { Routes } from "../../../config/routes";
import { ClockIcon } from "../../../svg";
import {
  DateText,
  DateWrapper,
  ImageWrapper,
  PostBody,
  PostFooter,
  PostText,
  PostTitle,
  PostWrapper,
  StyledImage,
  StyledLink,
  StyledImagePlaceholder,
  PostTextWrapper,
} from "./styles";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import localizationService from "src/services/shared/localizationService";
import useLocale from "src/hooks/useLocale";

type Props = {
  post: PostDTO;
};

const Post: React.FC<Props> = ({ post }) => {
  const { getLocale } = useLocale();
  const locale = getLocale();
  return (
    <PostWrapper>
      <ImageWrapper>
        <Link href={`${Routes.Blog}/${post.slugUrl}`} passHref>
          <StyledLink>
            {post.image ? (
              <StyledImage
                priority
                unoptimized
                src={post.image!}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <StyledImagePlaceholder />
            )}
          </StyledLink>
        </Link>
      </ImageWrapper>
      <PostBody>
        <Link href={`${Routes.Blog}/${post.slugUrl}`} passHref>
          <StyledLink>
            <PostTitle>{post.title}</PostTitle>
          </StyledLink>
        </Link>
        <PostTextWrapper>
          <PostText>{post.shortDescription}</PostText>
        </PostTextWrapper>
        <PostFooter>
          <DateWrapper>
            <ClockIcon />
            <DateText>
              {localizationService.getLocalDateTime(post.createdAt?.toString(), locale)}
            </DateText>
          </DateWrapper>
        </PostFooter>
      </PostBody>
    </PostWrapper>
  );
};

export default Post;
