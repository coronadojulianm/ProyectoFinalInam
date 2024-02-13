import { pool } from "../database/conexion.js";

export const listarSitios = async(req,res)=> {
    try{
        let [result] = await pool.query(`select * from sitios`);

        if(result.length > 0){
            return res.status(200).json(result);
        }else{
            return res.status(403).json({ message: 'No se encontraron sitios' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const registrarSitio = async(req,res)=> {
    try{
        let { id_sitio, nombre_sitio, tipo_sitio, fk_id_inventario } = req.body;
        let sql = `insert into sitios (id_sitio, nombre_sitio, tipo_sitio, fk_id_inventario) values ('${id_sitio}', '${nombre_sitio}','${tipo_sitio}', '${fk_id_inventario}')`;

        let [rows] = await pool.query(sql);
        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Sitio registrado con exito' });
        }else{
            return res.status(403).json({ message: 'No se registró el sitio' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const actualizarSitio = async(req,res)=>{
    try{
        let id = req.params.id;
        let { nombre_sitio, tipo_sitio, fk_id_inventario } = req.body;
        let sql = `UPDATE sitios SET nombre_sitio = ?,
                                    tipo_sitio = ?,
                                    fk_id_inventario = ?
                                    WHERE id_sitio = ?`;
        let [rows] = await pool.query(sql, [nombre_sitio, tipo_sitio, fk_id_inventario, id]);
    
        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Sitio actualizado con exito' });
        }else{
            return res.status(403).json({ message: 'No se actualizó el sitio' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const eliminarSitio = async(req,res)=> {
    try{
        let id = req.params.id;
        let sql = `delete from sitios where id_sitio = ${id}`;

        let [rows] = await pool.query(sql);

        if(rows.affectedRows > 0){
            return res.status(200).json({ message: 'Se elimino el sitio con exito' });
        }else{
            return res.status(403).json({ message: 'El sitio no se eliminó' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

export const consultarSitio = async(req,res)=> {
    try{
        let id = req.params.id;
        let sql = `select * from sitios where id_sitio = ${id}`;

        let [rows] = await pool.query(sql);
        if(rows.length > 0){
            return res.status(200).json(rows);
        }else{
            return res.status(403).json({ message: 'No se encontró al usuario' });
        }
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}