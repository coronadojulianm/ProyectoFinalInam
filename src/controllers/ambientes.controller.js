import { pool } from '../database/conexion.js';

export const listarAmbientes = async(req,res)=> {
        try{
            const [result] = await pool.query('select * from ambientes');
            
            if(result.length>0){
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({'message': 'No se econtraron ambientes'});
            }
        }catch(e){
            return res.status(500).json({'message': 'error' + e});
        }
};

export const registrarAmbiente = async(req,res)=> {
    try{
        let {nombre_ambiente,estado_ambiente,fk_area} = req.body;
        let sql = `insert into ambientes (nombre_ambiente,estado_ambiente,fk_area) values('${nombre_ambiente}','${estado_ambiente}','${fk_area}')`;
    
        let [rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Se registro con exito el ambiente"});
        }else{
            return res.status(403).json({"message": "ambiente no registrado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}


export const eliminarAmbiente = async (req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from ambientes where id_ambiente = ${id}`;
        let [rows] = await pool.query(sql);
    
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Ambiente eliminado con exito"})
        }else{
            return res.status(403).json({"message": "Ambiente no eliminado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarAmbiente = async (req,res)=>{
    try{
        let id = req.params.id;
        let {nombre_ambiente,estado_ambiente,fk_area} = req.body;
        let sql = `UPDATE ambientes SET nombre_ambiente = ?,
                                         estado_ambiente = ?,
                                         fk_area = ?
                                         WHERE id_ambiente = ?`;
        let [rows] = await pool.query(sql, [nombre_ambiente,estado_ambiente,fk_area, id]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Ambiente actualizado con exito"})
        }else{
            return res.status(403).json({"message": "Ambiente no actualizado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const consultarAmbiente = async(req, res) => {
    try{
        let id = req.params.id;
        let sql = `select * from ambientes where id_ambiente = ?`;
        let [rows]=await pool.query(sql, [id]);
        if(rows.length>0){
            return res.status(200).json(rows);
        }else{
            return res.status(404).json({"message": "Ambiente no encontrado"});
        }
    }catch (e){ 
        return res.status(500).json({"message":e.message})
    }
}