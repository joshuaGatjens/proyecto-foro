# app/serializers/recursive_serializer.rb
class UserSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
# respond_to :JSONAPI
  attributes :id, :name, :email, :description
end
