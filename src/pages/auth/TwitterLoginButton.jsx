import React, { useState } from "react";
import axios from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

const TwitterLoginButton = () => {
    const [user, setUser] = useState(null);
    
    const twitterAuth = async () => {
        const oauth = OAuth({
            consumer: {
                key: "I73o2AUv28ixcyfOUExPQRDHw", // API Key
                secret: "d4t2fmBKaUP4pmGLI3Nw9aFyLh8XmijiLFYBSrMaHNFJerodme", // API Secret
            },
            signature_method: "HMAC-SHA1",
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            },
        });

        const requestData = {
            url: "https://api.twitter.com/oauth/request_token",
            method: "POST",
            data: {
                oauth_callback: "oob", // Change this to your redirect URI if needed
            },
        };

        try {
            const response = await axios.post(requestData.url, null, {
                headers: oauth.toHeader(oauth.authorize(requestData)),
            });

            const params = new URLSearchParams(response.data);
            const oauthToken = params.get("oauth_token");

            window.open(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`, "_blank");
        } catch (error) {
            console.error("Twitter Auth Error:", error);
        }
    };

    return (
        <div>
            <button onClick={twitterAuth} style={{ padding: "10px 20px", background: "#1DA1F2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Sign in with Twitter
            </button>
            {user && (
                <div>
                    <h3>Welcome, {user.name}!</h3>
                    <img src={user.profile_image_url} alt="Profile" width="50" />
                    <p>Username: @{user.screen_name}</p>
                </div>
            )}
        </div>
    );
};

export default TwitterLoginButton;
