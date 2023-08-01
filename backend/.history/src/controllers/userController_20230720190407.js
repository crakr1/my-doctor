import bcrypt from 'bcryptjs';
import  Jsonwebtoken  from 'jsonwebtoken';
import models from '../models';


export const register = async (req, res ) => {
    const {name, email, password, userType, specialization, address, location, workingHours, phone,} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({
            name,
            email,
            password: hashPassword,
            userType,
            latitude: location.latitude,
            longitude: location.longitude,
        });

    if (userType === 'doctor') {
        await models.profile.create({
            userId: user.id,
            specialization,
            address,
            workingHours,
            phone,
            });
        }

        res.status(200).json({ message: 'user account created'})
    }catch (e) {
        res.status(500).json(e)
        console.log(e);
    }
    
}

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await models.User.findOne({ where: { email } }); 
  
      if (!user) {
        return res.status(400).json({ 
          message: ' البريد الاكتروني غير صحيح',
        }); 
      }
      const authSuccess = await bcrypt.compare(password, user.password); 
      if (authSuccess) {  
        const token = Jsonwebtoken.sign(
          { id: user.id, name: user.name, email: user.email },
          process.env.JWT_SECRET
        ); 
        return res.status(200).json({ accessToken: token }); 
      }
      return res.status(400).json({
        message: 'كلمة المرور غير صحيحة', 
      }); 
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

export const me = (req, res) => {
    const user = req.currentUser;
    res.json(user)
}

export const getProfile = async (req, res) => {
    try{
        const result = await models.User.findOne({
            where: {id: req.currentUser.id},
            include: [{model: models.Profile, as: "profile"}],
            attributes: {exclude: ['password']}
        })
        res.status(200).json(result)
    }catch(e){
        res.status(500).json(e)
        console.log(e)
    }
}