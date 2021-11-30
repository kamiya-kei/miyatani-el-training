require 'rails_helper'

RSpec.describe Label, type: :model do
  describe 'バリデーション' do
    let(:label) { FactoryBot.build(:label, user_id: user.id, **params) }
    let(:user) { FactoryBot.create(:user) }
    let(:another_user) { FactoryBot.create(:user) }
    describe '正常系' do
      subject { label }
      context 'ラベル名がユニークな場合' do
        let(:params) { { name: 'test' } }
        it { is_expected.to be_valid }
      end

      context '同じラベル名を他のユーザーが使っている場合' do
        before { FactoryBot.create(:label, user_id: another_user.id, **params) }

        let(:params) { { name: 'test' } }
        it { is_expected.to be_valid }
      end
    end

    describe '異常系' do
      subject {
        label.valid?
        label.errors.full_messages
      }
      context 'ラベル名が空の場合' do
        let(:params) { { name: '' } }
        it { is_expected.to include("Name can't be blank") }
      end

      context 'ユーザーが空の場合' do
        let(:params) { { user_id: nil } }
        it { is_expected.to include("User can't be blank") }
      end

      context 'ラベル名がユニークではない場合' do
        before { FactoryBot.create(:label, user_id: user.id, **params) }

        let(:params) { { name: 'test' } }
        it { is_expected.to include('Name has already been taken') }
      end
    end
  end
end
