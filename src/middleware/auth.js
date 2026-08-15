import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({message:"Unauthorized access"});
  }
  const trimmedHeader = authHeader.trim();
  if(!trimmedHeader.toLowerCase().startsWith('bearer ')){
    return res.status(401).json({message:"Unauthorized access"});
  }
  
  const headerPart = authHeader.split(' ');
  if(headerPart.length !== 2){
    return res.status(401).json({message:"Unauthorized access"});
  }
  const token = headerPart[1];
  // // shorthand of above code
  // const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId: decoded.userId};
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};