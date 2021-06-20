import '../../App.css';

interface Props {
    phaseNumber: number;

  }
const Phases: React.FC<Props> = ({ phaseNumber }) =>{
  return (
<div className={"header-phases nav mx-auto " + (phaseNumber === 1 ? "container slider-one-active" : phaseNumber === 2 ? " container center slider-two-active" :  "container full slider-three-active") }>
<div className={"container" + (phaseNumber === 3 ? " top-10" : "")} >
      <ul className="progressbar">
        <li className={(phaseNumber === 1 ? "active" :  "")}>Step 1</li>
        <li className={(phaseNumber === 2 ? "active" :  "")}>Step 2</li>
        <li className={(phaseNumber === 3 ? "active" :  "")}>Step 3</li>
      </ul>
    </div>
  </div>
  
  );
}
export default Phases;
