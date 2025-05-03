import React, { useState } from 'react';
import { useLoaderData,Link } from 'react-router-dom';
function Auth(){
    const data = useLoaderData();
    return(<div>
        you are authenticated : {data}
        <Link to={"/logout"}>logout</Link>
    </div>)
}

export default Auth;