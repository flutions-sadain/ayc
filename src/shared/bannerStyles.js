import styled from "styled-components";
import { motion } from "framer-motion";

const Banner = styled(motion.section)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  @media (min-width: 1024px) {
    max-width: 960px;
  }
  @media (min-width: 1216px) {
    max-width: 1152px;
  }
  @media (min-width: 1408px) {
    max-width: 1244px;
  }

  .banner-inner {
    position: absolute;
    top: 7rem;
    max-width: 960px;
}
  }
  h1 {
    font-size: 32px;
    font-weight: normal;
    text-align: left;
    margin-bottom: 6rem;
    margin-top: 4rem;
    font-weight:300;
    .semi-bold {
      font-weight: 400;
    }
  }

  .extra-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 768px) {
      flex-direction:column;
    }
    ul {
      display: flex;
      flex-direction: column;
      text-align: left;
      list-style: none;
      padding: 0;

      span {
        margin-bottom: 10px;
        font-weight: bold;
      }
      li {
        font-weight:300;
      }
    }
  }
`;

export { Banner };
