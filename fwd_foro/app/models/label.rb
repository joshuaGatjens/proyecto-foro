class Label < ApplicationRecord
    validates :name, presence: true, length: { minimum: 3, maximum: 50 }
    validates :description, presence: true, length: { minimum: 10, maximum: 300 }
  
    has_and_belongs_to_many :questions, join_table: 'question_labels'
  end