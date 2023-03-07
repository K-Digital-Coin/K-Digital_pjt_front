import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import Content from "../components/nav/Content";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="mt-36 h-full flex justify-center items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
          <div className="flex justify-center items-center flex-col relative z-10">
            <h1 className="text-5xl">비트코인 실시간 시세 예측 서비스</h1>
            <motion.h1 variants={textVariant(1.1)}>
              <p className="flex flex-col items-center justify-center mt-16 text-gray-400 font-bold">
                Predict Bit는 실시간 비트코인의 시세와 예측시세를 보여주며
                여러분의 투자 의사결정에 도움을 줍니다.
                <button
                  onClick={() => {
                    alert("로그인 후 사용가능합니다.");
                    navigate("/logIn");
                  }}
                  className="flex items-center justify-center w-72 h-12 mt-11 border-2 rounded-full text-white hover:scale-105 bg-purple-400 hover:bg-purple-500"
                >
                  <span role="img" aria-label="chart">
                    📈
                  </span>
                  시작
                </button>
              </p>
            </motion.h1>
          </div>
        </motion.div>
      </section>
      <Content />
    </>
  );
};
export default Home;
