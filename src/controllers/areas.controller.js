import { pool } from "../database/conexion.js";

export const listarAreas = async(req,res)=> {
    try{
        let [result] = await pool.query(`select * from areas`);

        if(result.length > 0){
            return res.status(200).json(result);
        }else{
            return res.status(403).json({ message: 'No se encontraron areas' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const registrarArea = async(req,res)=> {
    try{
        let { nombre_area, estado } = req.body;
        let sql = `insert into areas (nombre_area, estado) values ('${nombre_area}', '${estado}')`;

        let [rows] = await pool.query(sql);
        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Area registrada con exito' });
        }else{
            return res.status(403).json({ message: 'No se registró el area' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const actualizarArea = async(req,res)=>{
    try{
        let id = req.params.id;
        let { nombre_area, estado } = req.body;
        let sql = `UPDATE areas SET nombre_area = ?,
                                    estado = ?
                                    WHERE id_area = ?`;
        let [rows] = await pool.query(sql, [nombre_area, estado, id]);
    
        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Area actualizada con exito' });
        }else{
            return res.status(403).json({ message: 'No se actualizó el area' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const eliminarArea = async(req,res)=> {
    try{
        let id = req.params.id;
        let sql = `delete from areas where id_area = ${id}`;
        let [rows] = await pool.query(sql);

        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Se elimino el area con exito' });
        }else{
            return res.status(403).json({ message: 'El area no se eliminó' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const consultarArea = async(req,res)=> {
    try{
        let id = req.params.id;
        let sql = `select * from areas where id_area = ${id}`;

        let [rows] = await pool.query(sql);
        if(rows.length > 0){
            return res.status(200).json(rows);
        }else{
            return res.status(403).json({ message: 'No se encontró el area' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}