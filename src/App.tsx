import { useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import poweredImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftarrow.png";
import { GridItem } from "./components/GridItem";
import { levels, calcutateImc, Level } from "./helpers/imc";
import { Warning } from "./components/Warning";
function App() {
  const [height, setHeight] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [warning, setWarning] = useState<string | null>(null);
  const [toShow, setToShow] = useState<Level | null>(null);
  const [infoMobile,setInfoMobile] = useState<JSX.Element | null>(null);
  const spanRef = useRef() as {current:HTMLSpanElement};
  const handleCalculatedBtn = () => {
    if (height && weight) {
      setToShow(calcutateImc(parseFloat(height), parseFloat(weight)));
    } else {
      window.scrollTo({top:0});
      setWarning("Preencha todos os campos!");
      setTimeout(() => setWarning(null), 3000);
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setHeight("");
    setWeight("");
  };
  useEffect(()=>{
    window.innerWidth <= 770 ? setInfoMobile(<span>{"<-"} Calcular Novamente ?</span>) : setInfoMobile(null);
    window.addEventListener('resize',()=>{
      (window.innerWidth <= 770) ? setInfoMobile(<span>{"<-"} Calcular Novamente ?</span>) : setInfoMobile(null)
    })
  },[])
  return (
    <div className={style.main}>
      <Warning warning={warning} />
      <header>
        <div className={style.headerContainer}>
          <img src={poweredImage} alt="logo" width={150} />
        </div>
      </header>
      <div className={style.container}>
        <div className={style.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            O IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado
            pela Organização Mundial da Saúde para calcular o peso ideal de cada
            pessoa.
          </p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex 1.5 (em metros)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            disabled={(toShow) ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex 75.3 (em kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={(toShow) ? true : false}
          />
          <button style={{display:toShow ? 'none' : 'block' }} onClick={handleCalculatedBtn}>Calcular</button>
        </div>
        <div className={style.rightSide}>
          {!toShow ? (
            <div className={style.grid}>
              {levels.map((item, key) => {
                return <GridItem key={key} item={item} />;
              })}
            </div>
          ) : (
            <div className={style.rightBig}>
            {infoMobile}
              <div title={window.innerWidth > 770 ? "Calcular novamente?" : undefined }className={style.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="left arrow" width={25} />
              </div>
              
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
