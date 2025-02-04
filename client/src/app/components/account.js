'use client'
import React, { useState, useEffect } from "react";
import { requestAccount } from "../utils/contractServices";
function Account() {
    const connectWallet = async () => {
        try {
          const account = await requestAccount();
          setAccount(account);
        } catch (error) {
          console.error("Failed to connect wallet:", error);
        }
      };
    return (
        <div>
            
        </div>
    )
};

export default Account;