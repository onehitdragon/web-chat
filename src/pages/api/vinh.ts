// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log(req.headers);
//     const cookie = req.headers.cookie;
//     if(typeof cookie === "undefined"){
//         res.status(200).json({
//             name: "No No"
//         });
//         return;
//     }

//     fetch(
//         "http://127.0.0.1:12345/account/CheckLogined",
//         { headers: { cookie } }
//     )
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         res.status(200).json({
//             name: "Vinh"
//         });
//     })
// }
