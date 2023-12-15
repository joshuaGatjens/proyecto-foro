require 'rails_helper'

RSpec.describe Answer, type: :model do
  subject { FactoryBot.create(:answer) }

  context 'Associations' do
    it { should belong_to(:user) }
    it { should belong_to(:question) }
    it { should have_many(:comments).dependent(:destroy) }
  end

context 'Validations' do
  it { should validate_presence_of(:body) }
end

  describe '#update_answer_points' do
    it 'updates the answer points based on votes' do
      # Crear votos para la respuesta
      3.times { subject.liked_by FactoryBot.create(:user) }
      2.times { subject.disliked_by FactoryBot.create(:user) }

      # Llamar al método que se está probando
      subject.update_answer_points

      # Verificar que los puntos de la respuesta se actualizaron correctamente
      expect(subject.get_upvotes.size - subject.get_downvotes.size).to eq(1) # 3 - 2 = 1
    end
  end
end