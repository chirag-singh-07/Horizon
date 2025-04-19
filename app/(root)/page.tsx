import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Chirag",
    lastName: "Singh",
    email: "chirag@gamil.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        transtion
      </div>

      <RightSideBar 
      user={loggedIn}
      transitions={[]}
      banks={[{currentBalance: 123.50},{currentBalance: 500.50}]}
      />
    </section>
  );
};

export default Home;
