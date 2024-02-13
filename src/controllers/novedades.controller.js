import { pool } from '../database/conexion.js';

export const listarNovedad = async(req,res)=> {

    const [result] = await pool.query('select * from novedades');
    res.status(200).json(result);
};

export const registrarNovedad = async(req,res)=> {
    try{
        let {fecha_nov,fk_id_usuario,novedad,tipo_nov,fk_id_prestamo} = req.body;
        let sql = `insert into novedades (fecha_nov,fk_id_usuario,novedad,tipo_nov,fk_id_prestamo) values('${fecha_nov}','${fk_id_usuario}','${novedad}','${tipo_nov}','${fk_id_prestamo}')`;
    
        let [rows] = await pool.query(sql);

        if(rows.affectedRows>0){
            return res.status(200).json({"message": "se registro con exito la novedad"});
        }else{
            return res.status(403).json({"message": "novedad no registrada"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const eliminarNovedad = async (req,res)=>{
    try{
        let id = req.params.id;
        let sql = `delete from novedades where id_novedad = ${id}`;
        let [rows] = await pool.query(sql);

        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Novedad eliminada con exito"})
        }else{
            return res.status(403).json({"message": "Novedad no eliminada"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarNovedad = async (req,res)=> {
    try{
        let id = req.params.id;
        let {fecha_nov, fk_id_usuario, novedad, tipo_nov,fk_id_prestamo} = req.body;
        let sql = `UPDATE novedades SET fecha_nov = ?,
                                    fk_id_usuario = ?,
                                    novedad = ?,
                                    tipo_nov = ?,
                                    fk_id_prestamo = ?
                                    WHERE id_novedad = ?`;
        let [rows] = await pool.query(sql, [fecha_nov, fk_id_usuario, novedad, tipo_nov, fk_id_prestamo, id]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Novedad actualizada con exito"})
        }else{
            return res.status(403).json({"message": "novedad no actualizada"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const consultarNovedad = async (req,res)=>{
    try{
        let id = req.params.id;
        let sql = `select * from novedades where id_novedad = ?`;
        let [rows]=await pool.query(sql, [id]);
        if(rows.length>0){
            return res.status(200).json(rows);
        }else{
            return res.status(404).json({"message": "novedad no encontrada"});
        }
    }catch (e){ 
        return res.status(500).json({"message":e.message})
    }
}