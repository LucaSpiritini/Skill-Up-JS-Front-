import React from "react";


const Boton = (text, color) => {

  return (
    <>
      
      {text.text==="acept"?
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded">acept</button>
      :text.text==="cancel"?
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded">cancel</button>
    :text.text==="edit"?
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">edit</button>
  :null}

    </>
  );
};

  export default Boton;
