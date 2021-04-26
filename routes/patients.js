const express = require('express');
const Joi = require('joi');
const router = express.Router();
const patients = [
    {
        id: 1,
        Patient_Information: {
            name: 'ADEBOYEJA AKINOLU',
            Address: '33, EJIKE STREET, OKOKO',
            City: 'LAGOS',
            State: 'LAGOS STATE',
            DOB: {
                day: 17,
                month: 2,
                year: 1997
            },
            Sex: 'M',
            Phone: 08100071717
        },
        Patient_Employment: {
            employment_status: 'STUDENT',
            Phone: 08032423433,
            employer: 'FUTA'
        }
    },
    {
        id: 2,
        Patient_Information: {
            name: 'ADEBOYEJA AKINRINDE',
            Address: '33, EJIKE STREET, OKOKO',
            City: 'LAGOS',
            State: 'LAGOS STATE',
            DOB: {
                day: 27,
                month: 5,
                year: 1999
            },
            Sex: 'M',
            Phone: 08100071716
        },
        Patient_Employment: {
            employment_status: 'EMPLOYED',
            Phone: 08098423433,
            employer: 'CISCO'
        }
    }];

router.post('/', (req, res)=>{
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let patient = {
        id:patients.length + 1,
        Patient_Information:{
            name:req.body.Patient_Information.name,
            Address: req.body.Patient_Information.Address,
            City: req.body.Patient_Information.city,
            State: req.body.Patient_Information.State,
            DOB: {
                day: req.body.Patient_Information.DOB.day,
                month: req.body.Patient_Information.DOB.month,
                year: req.body.Patient_Information.DOB.year
            },
           Sex: req.body.Patient_Information.Sex,
           Phone: req.body.Patient_Information.Phone
        },
        Patient_Employment:{
            employment_status: req.body.Patient_Employment.employment_status,
            Phone: req.body.Patient_Employment.Phone,
            employer: req.body.Patient_Employment.employer
        }        
    };
    patients.push(patient);
    res.send(patient);
});
router.get('/', (req, res) => {
res.send(patients); 	
});
router.get('/:id', (req, res) => {
let patient = patients.find((patient)=>patient.id===parseInt(req.params.id));
if(!patient)return res.status(404).send('Patient not found.');
res.send(patient);
});
router.put('/:id', (req, res) => {
    let patient = patients.find((patient)=>patient.id===parseInt(req.params.id));
    if(!patient)return res.status(404).send('Patient not found.');
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    patient.Patient_Information.name= req.body.Patient_Information.name
    patient.Patient_Information.Sex= req.body.Patient_Information.Sex;
    patient.Patient_Information.Phone=req.body.Patient_Information.Phone;
    res.send(patient);	
});
router.delete('/:id', (req, res) => {
    let patient = patients.find((patient)=>patient.id===parseInt(req.params.id));
    if(!patient)return res.status(404).send('Patient not found.');
    const index= patients.indexOf(patient);
    patients.splice(index,1);
    res.send(patient);
});
function validatePatient(patient){
    const schema = Joi.object({
        Patient_Information:{
            name:Joi.string().required().min(4),
            Address: Joi.string().required(),
            City: Joi.string().required(),
            State: Joi.string().required(),
            DOB: {
                day: Joi.number().integer().min(1).max(31),
                month: Joi.number().integer().min(1).max(12),
                year: Joi.number().integer().min(1930)
            },
           Sex: Joi.string().max(1).required(),
           Phone: Joi.string().min(6).max(15).required()
        },
        Patient_Employment:{
            employment_status: Joi.string().required(),
            Phone: Joi.string().min(6).required().max(15),
            employer: Joi.string()
        }
    });
    return schema.validate(patient);
}
module.exports=router;