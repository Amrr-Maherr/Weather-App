import { MoonLoader } from "react-spinners";

function Loader() {
  return (
    <div className="loader-container d-flex justify-content-center">
      <MoonLoader color="#3498db" size={50} />
    </div>
  );
}

export default Loader;
