import {createContext, useState, useContext} from 'react';

const TokenContext = createContext();

export const TokenProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUxMjQyYjZmNDU0ZDI4ZDBhYjlkYjFhZmYwN2ExMzdmODBiNzEzYTk3YjU2OTczYTYwYzg5ODc0NDhhNDk3NzIyODIyNjU4NzcwZmNiMzA4In0.eyJhdWQiOiI4ZDQ5ZGFjMC0wNzQzLTQyYTctYjk2Ni04ZDc1YWIzNzA3MDIiLCJqdGkiOiJlMTI0MmI2ZjQ1NGQyOGQwYWI5ZGIxYWZmMDdhMTM3ZjgwYjcxM2E5N2I1Njk3M2E2MGM4OTg3NDQ4YTQ5NzcyMjgyMjY1ODc3MGZjYjMwOCIsImlhdCI6MTcyNjY4Mzk2MywibmJmIjoxNzI2NjgzOTYzLCJleHAiOjE3MjY3Njk3MTQsInN1YiI6IjExNTE5NDcwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTUwNjg2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjpudWxsLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.aXB4d5k9jIFMwxYmIYHh9eLEAyPEnwglgh2vCqK0h7lUUqb0Atva-lfhNjwyQ6LbXGIYybEwywzAjdcY_BHXoayGNxwi-9LrjxmrvUprghjou4-n0BNSqn56WFUHGPvZZ1rQYjFvRjz3LQzSXaNl2UBZ2RiphlStJkXCNO_QtmANEs9sR_eY5fbxI9C1BEkNTJdzOyt4c0j494wvAaeblR_odJp4Fb34GnjgDlXJAWJjzHkLBWIgetNxOe9uMQrbMdwpVe3cZEQGK9bMq6Ya3Dp3zKx5wH8df_7jGwHvQbUfVOM7syPPlqzUEBkV-0ki8vu9bg103ctlsFalIW6k1Q');
    const [refreshToken, setRefreshToken] = useState('def50200e87f8c4f81363c3bcb77fe921c3005f3bfbc1ac0940b17514d4fde606d7ad20ee8308befbeab3320360ec1de891cfe97982fe0b7f679683d66a78b33d1c8614994b90751e7eb5ce463d41f10a7fc4377ad69d422fc6c04d09d38da9c8381021a5a85b55b7a95df9c6690f3317f2c45a5ce7077bd87accad694462729c5d356bef56d82baa715bf57a42af21b4ef1404fc408e5f6ee16b9f45590d94b76b17baeea679b2a2324770a50a2df950ff5f29f31e0e388065efb1d229861a6646f16437c5c8329be4bbb365c5774c8226678b74ab5a26027ecf84f25edfe55bba2ef7feb970e50a8645f97cf2fb7893645ee19838cde9425892aa05337d910178d341f21a25699f55caa46be5816b819f18ee279e01bd2de31ee6bfa1380df9a3f93e33b3125798fc8adfa669fccae5d7ef0e83d489059c66cfa3e44f9ccc06813be8e88eac9454ab44753566c19987c863172965b718386dc22c8d3b549f628823392f36b484616705209896dd2824e783ac13dd4896d4fee97a088df1392938ad0d967df9e99e4529641576646d78fe963704636056e09ce4efc8b5ce900c6f4d85a5c6191f598a36e1999014c1a3d0749e10ab01339c9f7999f9b6131cfb7c969d844142405543259a3d93793c491da4162ece5d678984ecb34f7aac8f4cfcf53d051a349be5400156b42e3');

    const updateTokens = (newAccessToken, newRefreshToken) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    };

    return (
        <TokenContext.Provider value={{accessToken, refreshToken, updateTokens}}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
