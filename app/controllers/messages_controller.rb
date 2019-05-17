class MessagesController < ApplicationController

def index
  @groups = Group.all
end

def create
end


end
