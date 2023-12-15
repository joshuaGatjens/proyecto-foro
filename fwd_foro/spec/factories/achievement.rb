FactoryBot.define do
    factory :achievement do
        name { 'we are #1' }
        description { 'Se el número uno en tu rank list' }
        requirements { 'alcanza la posición número 1 en tu rango' }
    end
end