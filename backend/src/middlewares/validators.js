export const SaveUser = (req, res ) => {
    req.checkBody('name')
    .notEmpty()
    .withMessage('الاسم مطلوب');


    req.checkBody('email')
    .notEmpty()
    .withMessage(' البريد الاكتروني مطلوب');


    req.checkBody('email')
    .isEmail()
    .withMessage(' صيغة البريد الاكتروني غير صحيحه ');

    req.checkBody('password')
    .notEmpty()
    .withMessage(' كلمه المرور مطلوبه ');

    req.checkBody('userType')
    .notEmpty()
    .withMessage(' نوع المستخدم مطلوب ');
}