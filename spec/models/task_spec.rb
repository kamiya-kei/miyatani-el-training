require 'rails_helper'

RSpec.describe Task, type: :model do
  describe '#validate' do
    let(:task) { FactoryBot.build(:task, params) }

    describe '正常系' do
      subject { task }

      context '全ての値がセットされているとき' do
        let(:params) { {} }
        it { is_expected.to be_valid }
      end

      context 'タスクの説明が空のとき' do
        let(:params) { { description: '' } }
        it { is_expected.to be_valid }
      end

      context 'タスクの期限が空のとき' do
        let(:params) { { deadline: '' } }
        it { is_expected.to be_valid }
      end
    end

    describe '異常系' do
      subject {
        task.valid?
        task.errors.full_messages
      }

      context 'タスクのタイトルが空のとき' do
        let(:params) { { title: '' } }
        it { is_expected.to include("Title can't be blank") }
      end

      context 'タスクのステータスが-1,0,1以外の時' do
        let(:params) { { done_id: 2 } }
        it { is_expected.to include('Done is not included in the list') }
      end
    end
  end
end
