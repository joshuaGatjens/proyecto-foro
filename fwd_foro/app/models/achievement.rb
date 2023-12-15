class Achievement < ApplicationRecord
  has_and_belongs_to_many :users

  validates :name, presence: true, uniqueness: true, length: { minimum: 2, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10, maximum: 500 }
  validates :requirements, presence: true, length: { minimum: 5, maximum: 200 }


end
