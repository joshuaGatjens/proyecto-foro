# spec/models/achievement_spec.rb
require 'rails_helper'

RSpec.describe Achievement, type: :model do
  let(:achievement) { FactoryBot.build(:achievement) }

  context 'Validations' do
    it 'is valid with valid attributes' do
      expect(achievement).to be_valid
    end

    it 'is not valid without a name' do
      achievement.name = nil
      expect(achievement).not_to be_valid
    end

    it 'is not valid with a short name' do
      achievement.name = 'a'
      expect(achievement).not_to be_valid
    end

    it 'is not valid with a long name' do
      achievement.name = 'a' * 101
      expect(achievement).not_to be_valid
    end

    it 'is not valid without a description' do
      achievement.description = nil
      expect(achievement).not_to be_valid
    end

    it 'is not valid with a short description' do
      achievement.description = 'a' * 9
      expect(achievement).not_to be_valid
    end

    it 'is not valid with a long description' do
      achievement.description = 'a' * 501
      expect(achievement).not_to be_valid
    end

    it 'is not valid without requirements' do
      achievement.requirements = nil
      expect(achievement).not_to be_valid
    end

    it 'is not valid with short requirements' do
      achievement.requirements = 'a' * 4
      expect(achievement).not_to be_valid
    end

    it 'is not valid with long requirements' do
      achievement.requirements = 'a' * 201
      expect(achievement).not_to be_valid
    end
  end

  context 'Associations' do
    it 'has and belongs to many users' do
      association = described_class.reflect_on_association(:users)
      expect(association.macro).to eq(:has_and_belongs_to_many)
    end
  end
end
