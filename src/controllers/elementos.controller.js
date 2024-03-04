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
        let {codigo_sena,estado,nombre_elemento,tipo_elemento,fk_ambiente} = req.body;
        let sql = `insert into elementos (codigo_sena,estado,nombre_elemento,tipo_elemento,fk_ambiente) values('${codigo_sena}','${estado}','${nombre_elemento}','${tipo_elemento}','${fk_ambiente}')`;
    
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
        let sql = `delete from elementos where codigo_sena = ${id}`;
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
        let {codigo_sena,estado,nombre_elemento,tipo_elemento,fk_ambiente} = req.body;
        let sql = `UPDATE elementos SET codigo_sena = ?,
                                       estado = ?,
                                       nombre_elemento = ?,
                                       tipo_elemento = ?,
                                       fk_ambiente = ?
                                       WHERE codigo_sena = ?`;
        let [rows] = await pool.query(sql, [codigo_sena,estado,nombre_elemento,tipo_elemento,fk_ambiente,id]);
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
        let sql = `select * from elementos where codigo_sena = ?`;
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