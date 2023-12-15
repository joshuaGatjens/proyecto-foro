class PhotosController < ApplicationController
    def upload
        photo = params[:photo] # Acceder a la foto desde los parámetros
        
        # Lógica para guardar la foto en la base de datos o en el sistema de archivos
        # Aquí puedes usar gemas como 'Paperclip', 'CarrierWave', 'Active Storage' u otras para manejar la subida de archivos
    
        render json: { message: 'Foto subida exitosamente' }, status: :ok
    rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
    end
end