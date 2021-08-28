import jwt, { decode } from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // 

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'testing')

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is used to uniqely identify google account ID
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;