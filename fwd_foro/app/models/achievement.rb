class Achievement < ApplicationRecord
    has_and_belongs_to_many :users
    validates :name, presence: true
    validates :description, presence: true
    validates :requirements, presence: true
  end
  