import { motion } from "framer-motion";
import "../../Style/NavBar.css";

function NavBar() {
  return (
    <>
      <header>
        <nav>
          <motion.div
            className="nav-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Dark Weather</h1>
          </motion.div>

          <motion.div
            className="nav-list"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul>
              <li>Home</li>
              <li>Download App</li>
              <li>Contact us</li>
            </ul>
          </motion.div>

          <motion.div
            className="nav-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 0.8 }}
            whileTap={{scale:1.1}}
        
          >
            <button>Sign up</button>
          </motion.div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
