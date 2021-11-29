require 'rails_helper'

RSpec.describe TaskLabel, type: :model do
  describe 'バリデーション' do
    let(:user) { FactoryBot.create(:user) }
    let(:task) { FactoryBot.create(:task, user_id: user.id) }
    let(:label) { FactoryBot.create(:label, user_id: user.id) }
    let(:task_label) { FactoryBot.build(:task_label, task_id: task.id, label_id: label.id, **params) }
    describe '正常系' do
      let(:params) { {} }
      context 'task_idとlabel_idが設定されている場合' do
        subject { task_label }
        it { is_expected.to be_valid }
      end

      context '別のタスクに設定済みのラベルを他のタスクに設定しようとした場合' do
        subject {
          another_task = FactoryBot.create(:task, user_id: user.id)
          FactoryBot.create(:task_label, task_id: another_task.id, label_id: label.id)
          task_label
        }
        it { is_expected.to be_valid }
      end

      context '別のラベルを設定済みのタスクに他のラベルを設定しようとした場合' do
        subject {
          another_label = FactoryBot.create(:label, user_id: user.id)
          FactoryBot.create(:task_label, task_id: task.id, label_id: another_label.id)
          task_label
        }
        it { is_expected.to be_valid }
      end
    end

    describe '異常系' do
      subject {
        task_label.valid?
        task_label.errors.full_messages
      }
      context 'task_idが空の場合' do
        let(:params) { { task_id: nil } }
        it { is_expected.to include("Task can't be blank") }
      end

      context 'label_idが空の場合' do
        let(:params) { { label_id: nil } }
        it { is_expected.to include("Label can't be blank") }
      end

      context '同じタスクに同じラベルを設定しようとした場合' do
        before { FactoryBot.create(:task_label, task_id: task.id, label_id: label.id) }

        let(:params) { {} }
        it { is_expected.to include('Label has already been taken') }
      end
    end
  end
end
