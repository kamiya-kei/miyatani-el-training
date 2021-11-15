require 'rails_helper'

RSpec.describe Task, type: :model do
  describe '#validate' do
    let(:task) { FactoryBot.build(:task, params) }

    context '全ての値がセットされているとき' do
      let(:params) { {} }
      it { expect(task).to be_valid }
    end

    context 'タスクの説明が空のとき' do
      let(:params) { { description: '' } }
      it { expect(task).to be_valid }
    end

    context 'タスクのタイトルが空のとき' do
      let(:params) { { title: '' } }
      it {
        task.valid?
        expect(task.errors.full_messages).to include("Title can't be blank")
      }
    end

    context 'タスクの期限が空のとき' do
      let(:params) { { deadline: '' } }
      it { expect(task).to be_valid }
    end
  end
end
