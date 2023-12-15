FactoryBot.define do
  factory :question do
    user
    title  { 'Necesito ayuda' }
    body { '¿cómo hago para centrar un div?' }
    question_points { 8 }
  end
end