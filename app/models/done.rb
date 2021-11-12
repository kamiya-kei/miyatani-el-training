class Done < ActiveHash::Base
  self.data = [
    { id: -1, text: '未着手' },
    { id:  0, text: '着手' },
    { id:  1, text: '完了' }
  ]
  include ActiveHash::Associations
  has_many :tasks
end
