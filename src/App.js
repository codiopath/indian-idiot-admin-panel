import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import AddAdmin from "./scenes/addAdmin";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AdminData from "./scenes/adminData";
import Login from "./Login";
import { LoginContext } from "./Contexts/LoginContext";
import { LoggedAdmin } from "./scenes/loggedAdminData";
import AddContent from "./scenes/addContent";
import Content from "./scenes/content";
import AddQuestion from "./scenes/addQuestion";
import Section from "./scenes/section";
import AddSection from "./scenes/addSection";
import Questions from "./scenes/questions";
import Answer from "./scenes/answer";
import Jobs from "./scenes/jobs";
import AddJobs from "./scenes/addJobs";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true)

  const [loggedIn, setLoggedIn] = useState('')

  const [loggedUserData, setLoggedUserData] = useState({})

  useEffect(()=>{
     setLoggedIn(localStorage.getItem("loggedIn"))
    // localStorage.removeItem("loggedIn")
  }, [])

  // useEffect(()=>{
  //   if(loggedIn){
  //     window.location.href = "http://localhost:5100/"
  //   }
  // })

  if(loggedIn === "true"){
  return (
    <LoginContext.Provider value={{loggedUserData, setLoggedUserData}}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<AdminData />} />
              {/* <Route path="/team" element={<Team />} /> */} 
              <Route path="/team" element={<AdminData />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-content" element={<AddContent />} />
              <Route path="/all-content" element={<Content />} />
              <Route path="/all-contacts" element={<Contacts />} />
              <Route path="/add-question" element={<AddQuestion />} />
              <Route path="/all-section" element={<Section />} />
              <Route path="/add-section" element={<AddSection />} />
              <Route path="/all-questions" element={<Questions />} />
              <Route path="/all-answers" element={<Answer />} />
              <Route path="/all-jobs" element={<Jobs />} />
              <Route path="/add-jobs" element={<AddJobs />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </LoginContext.Provider>
  );
  }

  else{
    return (
    <LoginContext.Provider value={{loggedUserData, setLoggedUserData}}>            
       <Routes>
                <Route exact path="/" element={<Login/>} />
        </Routes>
       </LoginContext.Provider>

    );
  }
}

export default App;
