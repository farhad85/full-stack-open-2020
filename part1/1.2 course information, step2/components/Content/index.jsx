import React from "react";
import Part from '../Part';

function Content({ contents }) {
  return (
    <div>
     <Part part={contents[0].part} exercises={contents[0].exercises} />
     <Part part={contents[1].part} exercises={contents[1].exercises}/>
     <Part part={contents[2].part} exercises={contents[2].exercises}/>
    </div>
  );
}

export default Content;
