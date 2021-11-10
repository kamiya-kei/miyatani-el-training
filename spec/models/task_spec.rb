require 'rails_helper'

RSpec.describe Task, type: :model do
  describe '#create' do
    before do
      @task = FactoryBot.build(:task)
    end

    context 'タスクが作成できるとき' do
      it '全ての値がセットされていると作成できる' do
        expect(@task).to be_valid
      end

      it 'タスクの説明が空でも作成できる' do
        @task.description = ''
        expect(@task).to be_valid
      end
    end

    context 'タスクが作成できないとき' do
      it 'タスクのタイトルが空だと作成できない' do
        @task.title = ''
        @task.valid?
        expect(@task.errors.full_messages).to include("Title can't be blank")
      end
    end
  end
  
end
