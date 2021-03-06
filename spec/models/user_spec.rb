require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    let(:user) { FactoryBot.build(:user, params) }

    describe '正常系' do
      subject { user }

      context '全ての値がセットされているとき' do
        let(:params) { {} }
        it { is_expected.to be_valid }
      end
    end

    describe '異常系' do
      subject {
        user.valid?
        user.errors.full_messages
      }

      context 'nameが空のとき' do
        let(:params) { { name: '' } }
        it { is_expected.to include("Name can't be blank") }
      end

      context 'nameがユニークでないとき' do
        subject {
          user.save
          user2 = FactoryBot.build(:user, name: user.name)
          user2.valid?
          user2.errors.full_messages
        }
        let(:params) { {} }
        it { is_expected.to include('Name has already been taken') }
      end

      context 'passwordが空のとき' do
        let(:params) { { password: '' } }
        it { is_expected.to include("Password can't be blank") }
      end

      context 'password_confirmationが一致しないとき' do
        let(:params) { { password: 'abc123', password_confirmation: 'def456' } }
        it { is_expected.to include("Password confirmation doesn't match Password") }
      end

      context 'passwordが6文字未満のとき' do
        let(:params) { { password: 'abc12' } }
        it { is_expected.to include('Password is too short (minimum is 6 characters)') }
      end

      context 'passwordが128文字超のとき' do
        let(:params) { { password: ('a' * 64) + ('1' * 65) } }
        it { is_expected.to include('Password is too long (maximum is 128 characters)') }
      end

      context 'passwordに半角英字が含まれないとき' do
        let(:params) { { password: '123456' } }
        it { is_expected.to include('Password is invalid. Include both letters and numbers') }
      end

      context 'passwordに半角数字が含まれないとき' do
        let(:params) { { password: 'abcdef' } }
        it { is_expected.to include('Password is invalid. Include both letters and numbers') }
      end
    end
  end

  describe 'パスワード一致チェック' do
    subject {
      FactoryBot.create(:user, name: 'test', password: 'abc123')
      User.search('test', password).present?
    }
    context 'パスワードが正しいとき' do
      let(:password) { 'abc123' }
      it { is_expected.to eq true }
    end

    context 'パスワードが正しくないとき' do
      let(:password) { 'def123' }
      it { is_expected.to eq false }
    end
  end

  describe '管理ユーザー' do
    before { admin }

    let(:admin) { FactoryBot.create(:user, role_id: Role::ADMIN) }
    let(:another_admin) { FactoryBot.create(:user, role_id: Role::ADMIN) }
    let(:user) { FactoryBot.create(:user, role_id: Role::REGULAR) }
    let(:another_user) { FactoryBot.create(:user, role_id: Role::REGULAR) }
    describe '正常系' do
      describe '一般ユーザーは1人でも削除できる' do
        subject { user.destroy! }
        it { expect { subject }.not_to raise_error }
      end

      describe '一般ユーザーは1人でも管理ユーザーに変更できる' do
        subject { user.update!(role_id: Role::ADMIN) }
        it { expect { subject }.not_to raise_error }
      end

      describe '管理ユーザーは1人じゃなければ削除できる' do
        subject { another_admin.destroy! }
        it { expect { subject }.not_to raise_error }
      end

      describe '管理ユーザーは1人じゃなければ一般ユーザーに変更できる' do
        subject { another_admin.update!(role_id: Role::REGULAR) }
        it { expect { subject }.not_to raise_error }
      end
    end

    describe '異常系' do
      describe '管理ユーザーが1人のときは削除できない' do
        subject { admin.destroy! }
        it { expect { subject }.to raise_error(ActiveRecord::RecordNotDestroyed) }
      end

      describe '管理ユーザーが1人のときは一般ユーザーに変更できない' do
        subject { admin.update!(role_id: Role::REGULAR) }
        it { expect { subject }.to raise_error(ActiveRecord::RecordNotSaved) }
      end
    end
  end
end
