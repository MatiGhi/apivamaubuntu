const { Router } = require('express');

const { getCreatorTable,
        getOneCreatorTable,
        postCreatorTable,
        putCreatorTable,
        deleteCreatorTable } = require('../controllers/creator_table');

//Schema Validators       
const { 
        creatorTableValidation,
        creatorTablePutValidation
    } = require('../validations/index.validations'); 

//Middleware Body Validator 
const { validation } = require('../middlewares/fieldsValidator');   

//Middleware JWT
const { checkAuth } = require('../middlewares/checkAuth');
        
const router = Router();

router.post('/creator-table',validation(creatorTableValidation),postCreatorTable);

router.get('/creator-table',checkAuth,getCreatorTable);

router.get('/creator-table/:id',checkAuth,getOneCreatorTable);

router.put('/creator-table/:id',checkAuth,validation(creatorTablePutValidation), putCreatorTable);

router.delete('/creator-table/:id', checkAuth, deleteCreatorTable);

module.exports = router;
