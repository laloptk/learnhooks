<?php 

namespace LearnHooks\Contracts;

interface HookableInterface {
    public function register_hooks(): void;
}