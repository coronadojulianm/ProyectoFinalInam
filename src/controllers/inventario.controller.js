import { pool } from '../database/conexion.js';

export const listarInventario = async(req,res)=> {
        try{
            const [result] = await pool.query('select * from inventario');
            
            if(result.length>0){
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({'message': 'No se econtró inventarios'});
            }
            
        }catch(e){
            return res.status(500).json({'message': 'error' + e});
        }
};

export const registrarInventario = async(req,res)=> {
    try{
        let {id_inventario,nombre_inv,fecha_creacion,fk_id_elementos} = req.body;
        let sql = `insert into inventario (id_inventario,nombre_inv,fecha_creacion,fk_id_elementos) values('${id_inventario}','${nombre_inv}','${fecha_creacion}','${fk_id_elementos}')`;
    
        let [rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Se registro con exito el inventario"});
        }else{
            return res.status(403).json({"message": "inventario no registrado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}


export const eliminarInventario = async (req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from inventario where id_inventario = ${id}`;
        let [rows] = await pool.query(sql);
    
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Inventario eliminado con exito"})
        }else{
            return res.status(403).json({"message": "Inventario no eliminado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarInventario = async (req,res)=>{
    try{
        let id = req.params.id;
        let {nombre_inv,fecha_creacion,fk_id_elementos} = req.body;
        let sql = `UPDATE inventario SET nombre_inv = ?,
                                       fecha_creacion = ?,
                                       fk_id_elementos = ?
                                       WHERE id_inventario = ?`;
        let [rows] = await pool.query(sql, [nombre_inv, fecha_creacion, fk_id_elementos, id]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Inventario actualizado con exito"})
        }else{
            return res.status(403).json({"message": "Inventario no actualizado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const consultarInventario = async(req, res) => {
    try{
        let id = req.params.id;
        let sql = `select * from inventario where id_inventario = ?`;
        let [rows]=await pool.query(sql, [id]);
        if(rows.length>0){
            return res.status(200).json(rows);
        }else{
            return res.status(404).json({"message": "Inventario no encontrado"});
        }
    }catch (e){ 
        return res.status(500).json({"message":e.message})
    }
}