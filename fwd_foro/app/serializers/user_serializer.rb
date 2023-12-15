# app/serializers/recursive_serializer.rb
class UserSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
# respond_to :JSONAPI
  attributes :id, :email, :description

  def avatar_url
    if object.avatar.attached?
      url_for(object.avatar)
    else
      # Puedes proporcionar un avatar predeterminado o devolver nil
      nil
    end
  end
end
