import { pool } from '../database/conexion.js';

export const listarElementos = async(req,res)=> {
        try{
            const [result] = await pool.query('select * from elementos');
            
            if(result.length>0){
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({'message': 'No se econtró elementos'});
            }
            
        }catch(e){
            return res.status(500).json({'message': 'error' + e});
        }
};

export const registrarElemento = async(req,res)=> {
    try{
        let {id_elemento,tipo_elemento,estado,fecha_ingreso} = req.body;
        let sql = `insert into elementos (id_elemento,tipo_elemento,estado,fecha_ingreso) values('${id_elemento}','${tipo_elemento}','${estado}','${fecha_ingreso}')`;
    
        let [rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Se registro con exito el elemento"});
        }else{
            return res.status(403).json({"message": "elemento no registrado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}


export const eliminarElemento = async (req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from elementos where id_elemento = ${id}`;
        let [rows] = await pool.query(sql);
    
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Elemento eliminado con exito"})
        }else{
            return res.status(403).json({"message": "Elemento no eliminado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarElemento = async (req,res)=>{
    try{
        let id = req.params.id;
        let {tipo_elemento,estado,fecha_ingreso} = req.body;
        let sql = `UPDATE elementos SET tipo_elemento = ?,
                                       estado = ?,
                                       fecha_ingreso = ?
                                       WHERE id_elemento = ?`;
        let [rows] = await pool.query(sql, [tipo_elemento, estado, fecha_ingreso, id]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Elemento actualizado con exito"})
        }else{
            return res.status(403).json({"message": "Elemento no actualizado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const consultarElemento = async(req, res) => {
    try{
        let id = req.params.id;
        let sql = `select * from elementos where id_elemento = ?`;
        let [rows]=await pool.query(sql, [id]);
        if(rows.length>0){
            return res.status(200).json(rows);
        }else{
            return res.status(404).json({"message": "Elemento no encontrado"});
        }
    }catch (e){ 
        return res.status(500).json({"message":e.message})
    }
}