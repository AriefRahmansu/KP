const { nanoid } = require('nanoid');

const db = require("../models");
const ACL = db.acl;

const acl = {};

acl.create = (device_id, acl) => {
    console.log(acl);
    return ACL.create({
        device_id: device_id,
        pub: acl.pub,
        pattern: acl.pattern,
    })
        .then((acl) => {
            console.log(">> Created device: " + JSON.stringify(acl, null, 4));
            return acl;
        })
        .catch((err) => {
            console.log(">> Error while creating project: ", err);
            return null;
        });
  };

acl.findById = (id) => {
    return ACL.findAll({where: {device_id: id}})
        .then((acl) => {
            return acl;
        })
        .catch((err) => {
            console.log(">> Error while finding device: ", err);
            return null;
        });
};

acl.findAll = (attr) => {
    return ACL.findAll({attributes: attr})
        .then((acl) => {
            return acl;
        });
};


// Update a Device by the id in the request
acl.update = (id, body) => {
    console.log("ID: ", id);

    return ACL.update({pub: body.pub, patern: body.pattern}, {
      where: { id: id }
    })
        .then(num => {
            console.log(num);
            if (num == 1) {
                return {status: 200, message: "ACL was updated successfully."};
            } else {
                return {status: 404, message: `Cannot update ACL with id=${id}. Maybe ACL was not found or req.body is empty!`};
            }
        })
    .catch(err => {
        return {status: 500, message: "Error updating ACL with id=" + id};
    });
}


// Delete a Device with the specified id in the request
acl.delete = (id) => {
    return ACL.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            return {status: 200, message: "ACL was deleted successfully!"};
        } else {
            return {status: 404, message: `Cannot delete ACL with id=${id}. Maybe ACL was not found!`};
        }
    })
    .catch(err => {
        return {status: 500, message: "Could not delete ACL with id=" + id};
    });
};


// ========== API ==========


acl.api_create = (req, res) => {
    console.log(req.body);
    acl.create(req.body.device_id, req.body)
        .then((newACL)=>{
            if (newACL != null){
                return res.status(201).send({message: 'ACL was created successfully'});
            }
            res.status(500).send({message: 'Error while creating ACL.'});
        });
}

acl.api_findById = (req, res) => {
    acl.findById(req.params.id)
        .then((result)=>{
            if (result != null){
                return res.status(200).send(result);
            }
            res.status(404).send({message: 'device not found.'});
        });
}

acl.api_findAll = (req, res) => {
    acl.findAll(['device_id', 'pub', 'pattern'])
        .then((result)=>{
            console.log(result);
        
            if (result != null){
                return res.status(200).send(result);
            }
            
            res.status(404).send({message: 'No ACL found.'});

        })
}



acl.mqttAuth = (req, res) => {
    send = {}

    send.status = "Ok";
    send.publish_acl = [];
    send.subscribe_acl = [];

    ACL.findAll({where: {device_id: req.userId}})
        .then((acl) => {
            acl.forEach(ac => {
                item = { pattern: ac.pattern };

                if (ac.pub) {
                    send.publish_acl.push(item);
                } else {
                    send.subscribe_acl.push(item);
                }
            });

            return res.status(200).send(send);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


acl.api_update = async(req, res) => {
    let result = await acl.update(req.params.id, req.body);
    return res.status(result.status).send({message: result.message});
};

acl.api_delete = async(req, res) => {
    let result = await acl.delete(req.params.id);
    return res.status(result.status).send({message: result.message});
}


module.exports = acl;