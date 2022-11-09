const { Router } = require('express');

const { getMasterCluster,
        getOneMasterCluster,
        postMasterCluster,
        putMasterCluster,
        deleteMasterCluster } = require('../controllers/master_cluster');

//Schema Validators       
const { 
        masterClusterValidation,
        masterClusterPutValidation
    } = require('../validations/index.validations'); 

//Middleware Body Validator 
const { validation } = require('../middlewares/fieldsValidator');   

//Middleware JWT
const { checkAuth } = require('../middlewares/checkAuth');
        
const router = Router();

router.post('/master-cluster',validation(masterClusterValidation),postMasterCluster);

router.get('/master-cluster',checkAuth,getMasterCluster);

router.get('/master-cluster/:id',checkAuth,getOneMasterCluster);

router.put('/master-cluster/:id',checkAuth,validation(masterClusterPutValidation), putMasterCluster);

router.delete('/master-cluster/:id', checkAuth, deleteMasterCluster);

module.exports = router;
